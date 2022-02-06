using AutoMapper;
using GoogleDriveCloneAppCore.Dtos;
using GoogleDriveCloneAppCore.Entities;
using GoogleDriveCloneAppCore.Errors;
using GoogleDriveCloneAppCore.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGoogleDriveService _googleDriveService;
        private readonly IMapper _mapper;
        UserManager<AppUser> _userManager;
        SignInManager<AppUser> _signInManager;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IUnitOfWork unitOfWork, IMapper mapper, IGoogleDriveService googleDriveService)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _googleDriveService = googleDriveService;
        }

        [HttpPost("register")]
        //api/account/register?username=Test&password=hoainam10th with Register(string username, string password)
        public async Task<ActionResult<UserDto>> Register(RegisterDto register)
        {
            if (await UserExists(register.UserName))
                return BadRequest("Username is taken");

            var user = new AppUser
            {
                UserName = register.UserName.ToLower(),
                DisplayName = register.DisplayName
            };

            var result = await _userManager.CreateAsync(user, register.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "user");
            if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);
            // them 1 root folder vao db
            var rootFolder = new RootFolderDto
            {
                Name = Guid.NewGuid().ToString().Substring(0, 10),
                UserId = user.Id
            };

            var rootFolderDb = _mapper.Map<RootFolderDto, RootFolder>(rootFolder);
            _unitOfWork.RootFolderRepository.Add(rootFolderDb);
            
            if (await _unitOfWork.Complete())
            {
                // tao thu muc root
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", rootFolder.Name);
                await _googleDriveService.CreateDirectory(path);

                return Ok(new UserDto
                {                    
                    UserName = user.UserName,
                    DisplayName = user.DisplayName,
                    Token = await _tokenService.CreateTokenAsync(user)
                });
            }

            return BadRequest(new ApiResponse(400, "Can not add root folder into database"));
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .SingleOrDefaultAsync(x => x.UserName == loginDto.UserName.ToLower());

            if (user == null)
                return BadRequest(new ApiResponse(400, "Invalid Username"));

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400, "Invalid password"));

            return new UserDto
            {
                UserName = user.UserName,
                DisplayName = user.DisplayName,                
                Token = await _tokenService.CreateTokenAsync(user)
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

        [HttpGet("username_exists")]
        public async Task<ActionResult<bool>> CheckUsernameExistsAsync([FromQuery] string username)
        {
            return await _userManager.FindByNameAsync(username) != null;
        }

        [Authorize]
        [HttpGet("get-users")]
        public async Task<ActionResult> GetUsers(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                var users = await _userManager.Users.ToListAsync();
                return Ok(_mapper.Map<List<AppUser>, List<UserDto>>(users));
            }
            else
            {
                var users = await _userManager.Users.Where(x => x.UserName.Contains(username.ToLower())).ToListAsync();
                return Ok(_mapper.Map<List<AppUser>, List<UserDto>>(users));
            }            
        }
    }
}
