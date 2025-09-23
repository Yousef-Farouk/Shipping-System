using AutoMapper;
using Microsoft.AspNetCore.Identity;
using ShippingSystem.DTOs;
using ShippingSystem.DTOs.Authentication;
using ShippingSystem.DTOs.Order;
using ShippingSystem.DTOS.City;
using ShippingSystem.DTOS.Governate;

//using ShippingSystem.DTOs.Employee;
using ShippingSystem.DTOs.Groups;
using ShippingSystem.DTOs.Privileges;
using ShippingSystem.Models;

namespace ShippingSystem.Services
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            //CreateMap<ApplicationUser, RegisterDTO>().ReverseMap();

            #region Users

                CreateMap<ApplicationUser, UserDetailsDTO>().ReverseMap();
                CreateMap<ApplicationUser, RegisterDTO>()
                  .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                  .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName))
                  .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.UserName))
                  .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber))
                  .ReverseMap();

            CreateMap<EmployeeDTO, Employee>()
             .ForMember(dest => dest.Branch_Id, opt => opt.MapFrom(src => src.BranchId))
             .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.Phone))
             //.ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.Password))
             .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
             .ForMember(dest => dest.UserGroups, opt => opt.MapFrom(src => src.Groups))
             .ForMember(dest => dest.Id, opt => opt.Ignore());



            CreateMap<Employee, EmployeeDTO>()
             .ForMember(dest => dest.Groups, opt => opt.MapFrom(src => src.UserGroups.Where(ug => ug.UserId == src.Id)))
             .ForMember(dest => dest.BranchId, opt => opt.MapFrom(src => src.Branch_Id))
             .ForMember(dest => dest.BranchName, opt => opt.MapFrom(src => src.Branch.Name))
            //.ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.PasswordHash))
             .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.PhoneNumber));

            #endregion




            #region Groups

            //CreateMap<Group, GroupDTO>()
            //.ForMember(dest => dest.GroupPrivileges, opt => opt.MapFrom(src => src.Privileges))
            //.ReverseMap()
            //.ForMember(dest => dest.Privileges, opt => opt.MapFrom(src => src.GroupPrivileges));

            CreateMap<Group, GetAllGroupsDTO>()
             .ReverseMap();


            CreateMap<Group, GroupDTO>()
              .ForMember(dest => dest.GroupPrivileges, opt => opt.MapFrom(src => src.GroupPrivilege));
            // .ReverseMap();
            //  .ForMember(dest => dest.GroupPrivileges, opt => opt.MapFrom(src => src.GroupPrivilege))


            CreateMap<GroupDTO, Group>()
             .ForMember(dest => dest.GroupPrivilege, opt => opt.Ignore());


            CreateMap<UserGroups, UserGroupDto>()
               .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.GroupId))
               .ForMember(dest => dest.name, opt => opt.MapFrom(src => src.Group.Name));

            CreateMap<UserGroupDto, UserGroups>()
               .ForMember(dest => dest.GroupId, opt => opt.MapFrom(src => src.Id));

            CreateMap<UserGroupDto, Group>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.name));



            CreateMap<GroupResponseDTO, GroupDTO>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.GroupPrivileges, opt => opt.MapFrom(src => src.GroupPrivileges))
                .ReverseMap();

            CreateMap<GroupResponseDTO, Group>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.DateAdded))
                .ForMember(dest => dest.GroupPrivilege, opt => opt.MapFrom(src => src.GroupPrivileges))
                .ReverseMap();

            CreateMap<GroupPrivilegeDTO, GroupPrivilege>()
                .ForMember(dest => dest.Privelege_Id, opt => opt.MapFrom(src => src.Privelege_Id))
                .ForMember(dest => dest.GroupId, opt => opt.MapFrom(src => src.GroupId))
                .ForMember(dest => dest.Add, opt => opt.MapFrom(src => src.Add))
                .ForMember(dest => dest.Delete, opt => opt.MapFrom(src => src.Delete))
                .ForMember(dest => dest.View, opt => opt.MapFrom(src => src.View))
                .ForMember(dest => dest.Update, opt => opt.MapFrom(src => src.Update))
                .ForMember(dest => dest.Privilege, opt => opt.Ignore())
                .ForMember(dest => dest.Group, opt => opt.Ignore());

            CreateMap<GroupPrivilege, GroupPrivilegeDTO>()
                .ForMember(dest => dest.Privelege_Id, opt => opt.MapFrom(src => src.Privelege_Id))
                .ForMember(dest => dest.GroupId, opt => opt.MapFrom(src => src.GroupId))
                .ForMember(dest => dest.Add, opt => opt.MapFrom(src => src.Add))
                .ForMember(dest => dest.Delete, opt => opt.MapFrom(src => src.Delete))
                .ForMember(dest => dest.View, opt => opt.MapFrom(src => src.View))
                .ForMember(dest => dest.Update, opt => opt.MapFrom(src => src.Update));


            CreateMap<Privilege, PrivilegeDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));

            CreateMap<PrivilegeDTO, Privilege>();

            #endregion




            #region Location

            CreateMap<Governate, GovernateDto>().ReverseMap();

            CreateMap<CityDto, City>();

            CreateMap<City, CityDto>()
            .ForMember(dest => dest.Governate_Id, opt => opt.MapFrom(src => src.Governate.Id));

            #endregion



            #region Orders

            CreateMap<Order, OrderDto>()
               .ForMember(dest => dest.MerchantName, opt => opt.MapFrom(src => src.Merchant.FullName))
               .ForMember(dest => dest.GovernateName, opt => opt.MapFrom(src => src.Governate.Name))
               .ForMember(dest => dest.CityName, opt => opt.MapFrom(src => src.City.Name))
              .ForMember(dest => dest.OrderDate, opt => opt.MapFrom(src => src.OrderDate.Value.Date));


            CreateMap<OrderDto, Order>();

            CreateMap<Order, OrderDto>().ReverseMap();

            CreateMap<ProductOrderDto, ProductOrder>().ReverseMap();


            #endregion





        }
    }
}


    public class EmployeeRolesResolver : IValueResolver<Employee, EmployeeDTO, List<string>>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public EmployeeRolesResolver(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public List<string> Resolve(Employee source, EmployeeDTO destination, List<string> destMember, ResolutionContext context)
        {
            var roles = _userManager.GetRolesAsync(source).Result;

            return roles.ToList();
        }
    }

    //public class AssignRolesResolver : IMappingAction<EmployeeDTO, Employee>
    //{
    //    private readonly UserManager<ApplicationUser> _userManager;

    //    public AssignRolesResolver(UserManager<ApplicationUser> userManager)
    //    {
    //        _userManager = userManager;
    //    }

    //    public async Task ProcessAsync(EmployeeDTO source, Employee destination, ResolutionContext context)
    //    {
    //        var currentRoles = await _userManager.GetRolesAsync(destination);
    //        await _userManager.RemoveFromRolesAsync(destination, currentRoles);

    //        var result = await _userManager.AddToRolesAsync(destination, source.Roles);
    //        if (!result.Succeeded)
    //        {
    //            // Handle role assignment failure
    //            throw new Exception($"Failed to assign roles to user '{destination.UserName}'.");
    //        }
    //    }

    //    // Implement the IMappingAction interface
    //    public void Process(EmployeeDTO source, Employee destination, ResolutionContext context)
    //    {
    //        ProcessAsync(source, destination, context).GetAwaiter().GetResult();
    //    }
    //}



