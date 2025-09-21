using ShippingSystem.DTOs.Groups;
using ShippingSystem.Models;

namespace ShippingSystem.Services
{
    public interface IGroupControllerService
    {
        public Task<IEnumerable<GetAllGroupsDTO?>> GetAllGroupsAsync(int pageNumber, int pageSize);

        public Task<IEnumerable<GetAllGroupsDTO?>> GetAllGroupsAsync();


        public Task<Group> GetGroupByIdAsync(int id);

        public Task<GroupDTO> GetGroupDTOByIdAsync(int id);


        public Task<Group?> GetGroupByNameAsync(string name);

        public Task<Group> AddGroupAsync(GroupDTO groupDTO);

        public Task UpdateGroupAsync(GroupDTO groupDTO);

        public Task DeleteGroupAsync(Group group);

        public Task Save();
    }
}