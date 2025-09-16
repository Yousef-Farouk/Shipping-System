using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShippingSystem.Models
{
    public class UserGroups
    {
        [ForeignKey("User")]
        public string UserId {  get; set; }

        [ForeignKey("Group")]
        public int GroupId { get; set; }

        public virtual ApplicationUser User { get; set; }

        public virtual Group Group { get; set; }

    }
}
