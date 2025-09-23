using Mapster;
using ShippingSystem.DTOs.Groups;
using ShippingSystem.Models;

namespace ShippingSystem.Mapping
{
    public class MappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            //config.ForType<GroupDTO, Group>()
            //    .Map(dest => dest.Id, src => src.Id)
            //   .Map(dest => dest.GroupPrivilege, src => src.GroupPrivileges)
            //   .AddThenUpdate();

            //config.ForType<GroupPrivilegeDTO, GroupPrivilege>()
            //   .Map(dest => dest.Privelege_Id, src => src.Privelege_Id)
            //   .Map(dest => dest.GroupId, src => src.GroupId);
               
        }
    }
}
