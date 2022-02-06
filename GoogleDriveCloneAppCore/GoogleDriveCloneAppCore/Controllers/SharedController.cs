using AutoMapper;
using GoogleDriveCloneAppCore.Dtos;
using GoogleDriveCloneAppCore.Entities;
using GoogleDriveCloneAppCore.Errors;
using GoogleDriveCloneAppCore.Extensions;
using GoogleDriveCloneAppCore.Helpers;
using GoogleDriveCloneAppCore.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Controllers
{
    [Authorize]
    [Route("nam/[controller]")]
    [ApiController]
    public class SharedController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IGoogleDriveService _googleDriveService;

        public SharedController(IUnitOfWork unitOfWork, IMapper mapper, IGoogleDriveService googleDriveService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _googleDriveService = googleDriveService;
        }
        
        //[HttpGet("{url}/{username}")] baseApi/nam/Shared/1cvde/hoainam10th
        [HttpGet]
        public async Task<ActionResult> GetShortUrl([FromQuery] FileOrFolderParams fileOrFolderParams)
        {
            var entity = await _unitOfWork.SharedToUserRepository.GetSharedToUserByUrl(fileOrFolderParams.Url, User.Identity.Name);            
            if (entity == null) return Unauthorized(new ApiResponse(401, "You are Unauthorized"));
            fileOrFolderParams.Path = entity.FullPath;

            var list = await _googleDriveService.GetFileAndFolders(fileOrFolderParams);
            
            Response.AddPaginationHeader(list.CurrentPage, list.PageSize, list.TotalCount, list.TotalPages);

            return Ok(new { data = list, parentPath = entity.FullPath });
        }

        [HttpPost]
        public async Task<ActionResult> Post(SharedToUserAddDto sharedToUser)
        {
            sharedToUser.Url = Guid.NewGuid().ToString().Substring(0, 8);
            sharedToUser.OwnerUsername = User.Identity.Name;
            var sharedToUserEntity = _mapper.Map<SharedToUserAddDto, SharedToUser>(sharedToUser);
            if(sharedToUser.SharedUsername != null || sharedToUser.SharedUsername.Length != 0)
            {
                foreach (var username in sharedToUser.SharedUsername)
                {
                    // khong them chinh no
                    if (User.Identity.Name != username)
                    {
                        var entity = new SharedToUser
                        {
                            FullPath = sharedToUserEntity.FullPath,
                            IsFolder = sharedToUserEntity.IsFolder,
                            Name = sharedToUserEntity.Name,
                            OwnerUsername = sharedToUserEntity.OwnerUsername,
                            SharedUsername = username,
                            ShortUrl = sharedToUserEntity.ShortUrl,
                            Url = sharedToUserEntity.Url
                        };
                        _unitOfWork.SharedToUserRepository.Add(entity);
                    }
                }
                if (await _unitOfWork.Complete())
                    return Ok(new 
                    {
                        url = sharedToUser.Url,
                        parentPath = sharedToUserEntity.FullPath//khong su dung
                    });
                else 
                    return BadRequest(new ApiResponse(400, "Error while add entity to shared database"));
            }
            else
            {
                return NoContent();
            }                       
        }
    }
}
