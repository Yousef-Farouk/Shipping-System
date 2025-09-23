using ShippingSystem.DTOs.Groups;
using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    public interface IGroupPrivilegeRepository
    {
        public Task<List<GroupPrivilege?>> GetGroupPrivilegesByGroupId(int groupId);

        public Task<IEnumerable<GroupPrivilege?>> GetGroupPrivilegesByGroupId(IEnumerable<UserGroups> userGroups);

        public  Task<IEnumerable<GroupPrivilege?>> GetGroupPrivilegesByUserId(string userId);
    }
}
