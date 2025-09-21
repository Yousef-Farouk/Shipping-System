using Microsoft.EntityFrameworkCore;
using ShippingSystem.Models;
using System.Drawing.Printing;

namespace ShippingSystem.Repositories
{
    public class GroupRepository : GenericRepository<Group>, IGroupRepository
    {
        private readonly ShippingContext db;

        public GroupRepository(ShippingContext db) : base(db)
        {
            this.db = db;
        }

        public async Task<Group?> GetGroupByNameAsync(string groupName)
        {
            return await db.Groups.FirstOrDefaultAsync(g => g.Name == groupName);
        }

        public async Task<IEnumerable<Group?>> GetGroupsAsync(int pageNumber, int pageSize)
        {
            //  return await db.Roles.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return await db.Groups.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        }

        public async Task<IEnumerable<Group?>> GetGroupsAsync()
        {
            return await db.Groups.Select(g => new Group { Id = g.Id, Name = g.Name }).ToListAsync();
        }
    }
}
