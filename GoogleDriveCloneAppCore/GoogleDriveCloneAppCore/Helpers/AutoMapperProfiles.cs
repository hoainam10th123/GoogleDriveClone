using AutoMapper;
using GoogleDriveCloneAppCore.Dtos;
using GoogleDriveCloneAppCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RootFolder, RootFolderDto>().ReverseMap();
            CreateMap<AppUser, UserDto>();
            //CreateMap<SharedToUser, SharedToUserAddDto>();
            CreateMap<SharedToUserAddDto, SharedToUser>()
                .ForMember(d => d.ShortUrl, o => o.MapFrom<ShareUrlResolver>());
        }
    }
}
