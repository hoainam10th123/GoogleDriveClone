using AutoMapper;
using GoogleDriveCloneAppCore.Dtos;
using GoogleDriveCloneAppCore.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Helpers
{
    public class ShareUrlResolver : IValueResolver<SharedToUserAddDto, SharedToUser , string>
    {
        private readonly IConfiguration _config;
        public ShareUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(SharedToUserAddDto source, SharedToUser destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.Url))
            {
                return _config["ApiUrl"]+ "nam/Shared/" + source.Url;
            }

            return null;
        }
    }
}
