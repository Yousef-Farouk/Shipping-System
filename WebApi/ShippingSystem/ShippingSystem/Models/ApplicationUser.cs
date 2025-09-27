using Azure.Identity;
using Microsoft.AspNetCore.Identity;
using ShippingSystem.Models;

namespace ShippingSystem.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FullName { get; set; }

        public bool IsDeleted { get; set; } = false;


        public virtual IList<UserGroups> UserGroups { get; set; } = new List<UserGroups>();

        public virtual RefreshToken RefreshToken { get; set; }
    }
}