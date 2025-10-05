using System.ComponentModel.DataAnnotations.Schema;

namespace ShippingSystem.Models
{
    public class OrderStatus
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual IEnumerable<OrderStatusRoleDescriptions> OrderStatusRoleDescriptions { get; set; }


    }
}
