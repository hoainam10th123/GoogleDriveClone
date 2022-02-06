using AutoMapper;
using GoogleDriveCloneAppCore.Dtos;
using GoogleDriveCloneAppCore.Entities;
using GoogleDriveCloneAppCore.Errors;
using GoogleDriveCloneAppCore.Extensions;
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
    [Route("api/[controller]")]
    [ApiController]
    public class RootFolderController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public RootFolderController(IUnitOfWork unitOfWork, IMapper mapper) 
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RootFolder>> GetRootFoler(int id)
        {
            var rootFolder = await _unitOfWork.RootFolderRepository.GetRootFolder(id);

            return Ok(rootFolder);
        }

        [HttpPost]
        public async Task<ActionResult> PostNewFolder()
        {
            var rootFolder = new RootFolderDto
            {
                Name = Guid.NewGuid().ToString().Substring(0, 10),
                UserId = User.GetUserId()
            };

            var rootFolderDb = _mapper.Map<RootFolderDto, RootFolder>(rootFolder);
            _unitOfWork.RootFolderRepository.Add(rootFolderDb);

            if (await _unitOfWork.Complete()) return Ok(rootFolder);

            return BadRequest(new ApiResponse(400, "Can not add"));
        }
    }
}
