using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using ShippingSystem.DTOs.Groups;
using ShippingSystem.Enumerations;
using ShippingSystem.Migrations;
using ShippingSystem.UnitOfWorks;
using System.Security.Claims;
using System.Text.Json;

namespace ShippingSystem.Filters
{
    public class GroupAuthorization : IAsyncAuthorizationFilter
    {
        private readonly PrivilegeEnum privilege;
        private readonly string action;

        public GroupAuthorization(PrivilegeEnum _privilege,string _action)
        {
            privilege = _privilege;
            action = _action;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var usergroupPrivelegeString = context.HttpContext.User.FindFirst("groupPrivelege")?.Value ;
            var usergroupPrivelege = JsonSerializer.Deserialize<List<GroupPrivilegeDTO>>(usergroupPrivelegeString ?? string.Empty);
            var requiredPrivelege = usergroupPrivelege?.FirstOrDefault(usp => usp.Privelege_Id == (int)privilege);


            if (requiredPrivelege == null) 
            {
                context.Result = new ForbidResult();
                return;
            }

            var actionProp = requiredPrivelege.GetType().GetProperty(action);

            if (actionProp == null)
            {
                context.Result = new ForbidResult();
                return;
            }

            var actionValue = actionProp.GetValue(requiredPrivelege);

            if (actionValue is bool boolValue && boolValue == false)
            {
                context.Result = new ForbidResult();
                return;
            }
        }
    }

    public class GroupAuthorzationFilterAttribute : TypeFilterAttribute
    {
        public GroupAuthorzationFilterAttribute(PrivilegeEnum _privilege, string _action) : base(typeof(GroupAuthorization))
        {
            Arguments = new object[] { _privilege , _action };
        }
    }
}
