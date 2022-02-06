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
    public class RootFolderRepository : IRootFolderRepository
    {
        private readonly DataContext _context;
        public RootFolderRepository(DataContext context)
        {
            _context = context;
        }

        public void Add(RootFolder rootFolder)
        {
            _context.RootFolders.Add(rootFolder);
        }

        public async Task<RootFolder> GetRootFolder(int id)
        {
            return await _context.RootFolders.FindAsync(id);
        }

        public async Task<RootFolder> GetRootFolderByUserId(int userId)
        {
            return await _context.RootFolders.FirstOrDefaultAsync(x=>x.UserId == userId);
        }
    }
}
