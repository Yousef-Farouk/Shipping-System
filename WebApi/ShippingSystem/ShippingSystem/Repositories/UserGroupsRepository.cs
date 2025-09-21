using Microsoft.EntityFrameworkCore;
using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    public class UserGroupsRepository : GenericRepository<UserGroupsRepository>,IUserGroupsRepository
    {
        public UserGroupsRepository(ShippingContext _db ): base(_db) { }

        public async Task<IEnumerable<UserGroups>> GetUserGroupsAsync(string userId )
        {
            return await db.UserGroups.Where(us => us.UserId == userId).ToListAsync();
        }

        public async Task RemoveUserGroupsAsync(ApplicationUser user)
        {
             db.UserGroups.RemoveRange(user.UserGroups);
        }
    }
}
