using Microsoft.EntityFrameworkCore;
using ShippingSystem.DTOs.Groups;
using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    public class GroupPrivilegeRepository : GenericRepository<GroupPrivilege>, IGroupPrivilegeRepository
    {
        private readonly ShippingContext context;

        public GroupPrivilegeRepository(ShippingContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<List<GroupPrivilege?>> GetGroupPrivilegesByGroupId(int groupId)
        {
            //return (await context.Roles.FirstOrDefaultAsync(g => g.Id == groupId))!.Privileges.ToList() ?? new List<GroupPrivilege?>();

            //var group = await context.Roles.FirstOrDefaultAsync(g => g.Id == groupId);
            //if (group != null)
            //{
            //    return group.Privileges.ToList()!;
            //}
            //else
            //{
            //    return new List<GroupPrivilege?>();
            //}

            return null;
        }

        public async Task<IEnumerable<GroupPrivilege?>> GetGroupPrivilegesByGroupId(IEnumerable<UserGroups> userGroups)
        {
            var userGroupIds = userGroups.Select(ug => (int?)ug.GroupId).ToList(); 
            return await context.GroupPrivilege.Where(gp => userGroupIds.Contains(gp.GroupId)).ToListAsync();
        }

        public async Task<IEnumerable<GroupPrivilege?>> GetGroupPrivilegesByUserId(string userId)
        {

            return await context.UserGroups.Where(us => us.UserId == userId)
                                    .Join(context.GroupPrivilege,
                                          userGroup => userGroup.GroupId,
                                          groupPrivelege => groupPrivelege.GroupId,
                                          (userGroup, groupPrivelege) => groupPrivelege).ToListAsync();
        }
    }
}
