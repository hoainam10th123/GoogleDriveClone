using GoogleDriveCloneAppCore.Data;
using GoogleDriveCloneAppCore.Entities;
using GoogleDriveCloneAppCore.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Repository
{
    public class SharedToUserRepository : ISharedToUserRepository
    {
        private readonly DataContext _context;
        public SharedToUserRepository(DataContext context)
        {
            _context = context;
        }

        public void Add(SharedToUser entity)
        {
            _context.SharedToUsers.Add(entity);
        }

        public async Task<SharedToUser> GetSharedToUserById(int id)
        {
            return await _context.SharedToUsers.FindAsync(id);
        }

        public async Task<SharedToUser> GetSharedToUserByUrl(string url, string username)
        {
            //dung FirstOrDefaultAsync vi tra ve co the la 1 list. giong nhau chi khac moi SharedUsername
            return await _context.SharedToUsers.FirstOrDefaultAsync(x => (x.Url == url && x.SharedUsername == username) || (x.Url == url && x.OwnerUsername == username));
        }
    }
}
