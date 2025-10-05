using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShippingSystem.Models
{
    [Table("AspNetRoles")]
    public class Roles : IdentityRole
    {
        public DateTime? DateAdded { get; set; } = DateTime.UtcNow;

        public virtual IEnumerable<OrderStatusRoleDescriptions> OrderStatusRoleDescriptions { get; set; }
    }

}
