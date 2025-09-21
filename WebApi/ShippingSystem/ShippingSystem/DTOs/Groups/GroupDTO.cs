using ShippingSystem.Models;

namespace ShippingSystem.DTOs.Groups
{
    public class GroupDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<GroupPrivilegeDTO> GroupPrivileges { get; set; } = new List<GroupPrivilegeDTO>();
    }
}
