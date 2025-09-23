using AutoMapper;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using ShippingSystem.DTOs.Groups;
using ShippingSystem.Models;
using ShippingSystem.Repositories;
using ShippingSystem.UnitOfWorks;
using IMapper = MapsterMapper.IMapper;
using IAutoMapper = AutoMapper.IMapper;
using Mapster;

namespace ShippingSystem.Services
{
    public class GroupControllerService : IGroupControllerService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IAutoMapper mapper;

        public ShippingContext dbContext;

        public IMapper mapster;

        public GroupControllerService(IUnitOfWork unitOfWork, IAutoMapper mapper,ShippingContext _dbContext,IMapper _mapster)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            dbContext = _dbContext;
            mapster = _mapster;
        }

        public async Task<IEnumerable<GetAllGroupsDTO?>> GetAllGroupsAsync(int pageNumber, int pageSize)
        {
            var groups = await unitOfWork.GroupRepository.GetGroupsAsync(pageNumber, pageSize);

            return mapper.Map<IEnumerable<GetAllGroupsDTO>>(groups);
        }


        public async Task<IEnumerable<GetAllGroupsDTO?>> GetAllGroupsAsync()
        {
            var groups = await unitOfWork.GroupRepository.GetGroupsAsync();

            return mapper.Map<IEnumerable<GetAllGroupsDTO>>(groups);
        }



        public async Task<Group> GetGroupByIdAsync(int id)
        {
            return await unitOfWork.GroupRepository.GetById(id);
        }

        public async Task<GroupDTO> GetGroupDTOByIdAsync(int id)
        {
            var group = await unitOfWork.GroupRepository.GetById(id);
            return mapper.Map<GroupDTO>(group);
        }

        public async Task<Group?> GetGroupByNameAsync(string name)
        {
            return await unitOfWork.GroupRepository.GetGroupByNameAsync(name); ;
        }

        public async Task<Group> AddGroupAsync(GroupDTO groupDTO)
        {            
            var group = mapper.Map<Group>(groupDTO);

            //group.DateAdded = DateTime.Now;
            //group.NormalizedName = group.Name.ToUpper();
            //group.ConcurrencyStamp = Guid.NewGuid().ToString();

            await unitOfWork.GroupRepository.Add(group);

            await unitOfWork.GroupRepository.Save();
            return group;
        }

        public async Task UpdateGroupAsync(GroupDTO groupDTO)
        {
            try
            {
               
                var existingGroup = await unitOfWork.GroupRepository.GetById(groupDTO.Id);

                mapper.Map(groupDTO, existingGroup);

                foreach (var groupPrivilege in groupDTO.GroupPrivileges)
                {
                    var existingGroupPrivilege = existingGroup.GroupPrivilege.FirstOrDefault(gp => gp.Privelege_Id == groupPrivilege.Privelege_Id);

                    if (existingGroupPrivilege != null)
                    {
                        mapper.Map(groupPrivilege, existingGroupPrivilege);

                    }
                    else
                    {
                        var newGroupPrivilege = mapper.Map<GroupPrivilege>(groupPrivilege);
                        existingGroup.GroupPrivilege.Add(newGroupPrivilege);
                    }
                }

                var privilegeToDelete = existingGroup.GroupPrivilege.Where(gp => !groupDTO.GroupPrivileges.Any(dto => dto.Privelege_Id == gp.Privelege_Id)).ToList();

                if (privilegeToDelete.Any())
                {
                    unitOfWork.GroupPrivilegeRepository.DeleteRange(privilegeToDelete);
                }

                // unitOfWork.GroupRepository.Update(existingGroup);
                var entityState = dbContext.Entry(existingGroup).State;
                Console.WriteLine($"The state of the group is: {entityState}"); // Check your output console
                unitOfWork.Save();

                //groupDTO.Adapt(existingGroup);
                //unitOfWork.GroupRepository.Update(existingGroup);
                //var entityState = dbContext.Entry(existingGroup).State;
                //Console.WriteLine($"The state of the group is: {entityState}"); // Check your output console
                //unitOfWork.Save();

            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw new DbUpdateConcurrencyException("Concurrency conflict occurred.", ex);
            }

        }

    public async Task DeleteGroupAsync(Group group)
        {
            //List<GroupPrivilege> groupPrivileges = null;
            //await Task.Run(async () =>
            //{
            //    var allPrivileges = await unitOfWork.GroupPrivilegeRepository.GetAll();
            //    //groupPrivileges = allPrivileges.Where(gp => gp.RoleId == group.Id).ToList();
            //});

            //if (groupPrivileges != null)
            //{
            //    foreach (var privilege in groupPrivileges)
            //    {
            //        await unitOfWork.GroupPrivilegeRepository.Delete(privilege);
            //    }
            //}

            await unitOfWork.GroupRepository.Delete(group);
            await unitOfWork.Save();
        }

        public async Task Save()
        {
            await unitOfWork.Save();
        }

      
    }
}