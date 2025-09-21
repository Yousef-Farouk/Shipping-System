using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    public interface IUserGroupsRepository : IGenericRepository<UserGroupsRepository>
    {

        public Task<IEnumerable<UserGroups>> GetUserGroupsAsync(string userId);

        public Task RemoveUserGroupsAsync(ApplicationUser user);


    }
}
