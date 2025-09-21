using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShippingSystem.DTOs;
using ShippingSystem.Models;
using ShippingSystem.Repositories;
using ShippingSystem.UnitOfWorks;

public class EmployeeService
{
  
    private readonly IUnitOfWork unit;
    private readonly IMapper mapper;
    private readonly UserManager<ApplicationUser> userManager;

    public EmployeeService(IUnitOfWork _unit,IMapper _mapper,UserManager<ApplicationUser> _userManager)
    {
        unit = _unit;
        mapper = _mapper;
        userManager = _userManager;
    }

    public async Task<List<EmployeeDTO>> GetAllEmployees()
    {
        var employees = await unit.EmployeeRepository.GetActiveEmployee();
        return mapper.Map<List<EmployeeDTO>>(employees);
    }

    public async Task<EmployeeDTO> GetEmployeeById(string id)
    {
        var employee = await unit.EmployeeRepository.GetById(id);

        if(employee == null) 
        {
            return null;
        }

        return mapper.Map<EmployeeDTO>(employee);
    }

    public async Task<IdentityResult> AddEmployee(EmployeeDTO employeeDto)
    {
        var employee = mapper.Map<Employee>(employeeDto);

        //await userManager.UserValidators
        var result = await userManager.CreateAsync(employee, employeeDto.Password); // Replace with appropriate password handling
        if (!result.Succeeded)
        {
            return result;
        }

        // Assign roles to the new employee

        //if (employeeDto.Groups != null) 
        //{
        //    var rolesResult = await userManager.AddToRolesAsync(employee, employeeDto.Groups);
        //    if (!rolesResult.Succeeded)
        //    {
        //        throw new Exception($"Failed to assign roles to user '{employee.FullName}'.");
        //    }

        //}
        var rolesResult = await userManager.AddToRolesAsync(employee,new List<string> {"employee"});



        if (!rolesResult.Succeeded)
        {
            throw new Exception($"Failed to assign roles to user '{employee.FullName}'.");
        }

        return result; 

        // No need to await AssertConfigurationIsValid because it returns void
        //mapper.ConfigurationProvider.AssertConfigurationIsValid();
    }

    //public async Task<IdentityResult> UpdateEmployee(EmployeeDTO employeeDto)
    //{
    //    var employee = await userManager.FindByIdAsync(employeeDto.Id);

    //    //var current_roles = await userManager.GetRolesAsync(employee);


    //    //if (employeeDto.Groups != null)
    //    //{
    //    //    await userManager.RemoveFromRolesAsync(employee, current_roles);
    //    //    var rolesResult = await userManager.AddToRolesAsync(employee, employeeDto.Groups);
    //    //    if (!rolesResult.Succeeded)
    //    //    {
    //    //        throw new Exception($"Failed to assign roles to user '{employee.FullName}'.");
    //    //    }

    //    //}
    //    //employee.FullName = employeeDto.FullName;
    //    ////employee.UserName = employeeDto.UserName;
    //    //employee.Email = employeeDto.Email;
    //    //employee.PhoneNumber = employeeDto.Phone;
    //    //if(employee.Branch != null  )
    //    //{
    //    //    employee.Branch.Id = employeeDto.BranchId ?? employee.Branch.Id;
    //    //    //employee.Branch.Name = employeeDto.BranchName ?? employee.Branch.Name;
    //    //}
    //    //else if (employee.Branch == null && employeeDto.BranchId.HasValue)
    //    //{
    //    //    employee.Branch = new Branch { Id = employeeDto.BranchId.Value };
    //    //    //employee.Branch.Name = employeeDto.BranchName ?? employee.Branch.Name;
    //    //}
    //    //employee.Status = employeeDto.Status;

    //    if(employee != null)
    //    {
    //        employee = mapper.Map<Employee>(employeeDto);
    //        if (employeeDto.Groups != null)
    //        {
    //            foreach (var group in employeeDto.Groups)
    //            {
    //                employee.UserGroups.Add(new UserGroups()
    //                {
    //                    GroupId = group,
    //                    UserId = employeeDto.Id
    //                });
    //            }
    //        }
    //        var result = await userManager.UpdateAsync(employee);
    //        return result;
    //    }
    //    throw new Exception("Employee not Found");

    //    //await unit.EmployeeRepository.Update(employee);
    //    //await unit.Save();
    //    //if (!string.IsNullOrEmpty(employeeDto.Password))
    //    //{
    //    //    var token = await userManager.GeneratePasswordResetTokenAsync(employee);
    //    //    var passwordResult = await userManager.ResetPasswordAsync(employee, token, employeeDto.Password);
    //    //    if (!passwordResult.Succeeded)
    //    //    {
    //    //        throw new Exception($"Failed to update password for user '{employeeDto.FullName}'.");
    //    //    }
    //    //}
    //}
    public async Task<IdentityResult> UpdateEmployee(EmployeeDTO employeeDto)
    {
        // 1. FETCH the existing employee from the database. This is the most critical step.
        var employee = await userManager.FindByIdAsync(employeeDto.Id);
        if (employee == null)
        {
            // Or return an appropriate IdentityResult with an error
            throw new Exception($"Employee with ID '{employeeDto.Id}' not found.");
        }

        // 2. MAP the DTO properties onto the existing, tracked employee object.
        // This updates simple properties like FullName, Email, etc.
        mapper.Map(employeeDto, employee);

        // 3. HANDLE a password update separately and securely.
        if (!string.IsNullOrEmpty(employeeDto.Password))
        {
            var token = await userManager.GeneratePasswordResetTokenAsync(employee);
            var passwordResult = await userManager.ResetPasswordAsync(employee, token, employeeDto.Password);
            if (!passwordResult.Succeeded)
            {
                // You might want to return the result directly or log the errors
                throw new Exception($"Failed to update password for user '{employee.FullName}'.");
            }

        }
        // 4. HANDLE the UserGroups collection manually. This is complex logic.
        // This ensures you correctly add new groups and remove old ones.

        //unit.UserGroupsRepository.RemoveUserGroupsAsync(employee);

        //unit.Save();

        //if (employeeDto.Groups != null)
        //{

        //    foreach (var group in employeeDto.Groups)
        //    {
        //       //employee.UserGroups = new List<UserGroups>();
        //        employee.UserGroups.Add(new UserGroups()
        //        {
        //            GroupId = group.Id,
        //            UserId = employeeDto.Id
        //        });
        //    }
        //}

        // 5. UPDATE the employee with the new property values.
        var result = await userManager.UpdateAsync(employee);

        return result;
    }
    public async Task<bool> DeleteEmployee(string id)
    {
        var employee = await unit.EmployeeRepository.GetById(id);

        if(employee == null)
        {
            return false;
        }

       var result =  await unit.EmployeeRepository.DisableEmployee(id);

        if (result == false)
            return false;
        try
        {
            await unit.EmployeeRepository.Save();

            return true;
        }

        catch (Exception ex) 
        {
            return false;
        }
      
    }

   public async Task<EmployeeDTO> GetEmployeeByName(string name)
    {
        var employee = await unit.EmployeeRepository.GetEmployeeByName(name);

        if (employee == null)
        {
            return null;
        }

        return mapper.Map<EmployeeDTO>(employee);
    }

    public async Task<EmployeeDTO> GetEmployeeByEmail(string email)
    {
        var employee = await unit.EmployeeRepository.GetEmployeeByEmail(email);

        if (employee == null)
        {
            return null;
        }

        return mapper.Map<EmployeeDTO>(employee);
    }
}
