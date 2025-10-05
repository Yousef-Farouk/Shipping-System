using System.ComponentModel.DataAnnotations.Schema;

namespace ShippingSystem.Models
{
    public class OrderStatusRoleDescriptions
    {

        [ForeignKey("OrderStatus")]
        public int StatusId { get; set; }

        [ForeignKey("Roles")]
        public string RoleId { get; set; }

        public string Description { get; set; }

        public virtual OrderStatus OrderStatus {get;set;} 

        public virtual Roles  Roles { get; set; }

    }
}
