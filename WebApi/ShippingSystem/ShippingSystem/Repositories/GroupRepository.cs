using Microsoft.EntityFrameworkCore;
using ShippingSystem.Models;

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
    }
}
