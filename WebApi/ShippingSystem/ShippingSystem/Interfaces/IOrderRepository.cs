using ShippingSystem.DTOs.Order;
using ShippingSystem.Enumerations;
using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        Task<IEnumerable<Order>> GetOrdersAsync(int pageNumber, int pageSize);

        Task<IEnumerable<Order>> GetOrdersByCustomerNameAsync(string name);

        Task<IEnumerable<Order>> GetMerchantOrdersAsync(string id);

        Task<IEnumerable<Order>> GetRepresentativeOrdersAsync(string id);

        Task<IEnumerable<Order>> FilterByStatus(OrderStatusEnum status);

        Task<IEnumerable<Order>> FilterByStatusAndDate(OrderStatusEnum status, DateTime startDate, DateTime endDate);

        Task<Order> CalculateTotalCost(Order order);

        Task<IList<OrderCountDto>> GetEmployeeCountOrders(string roleId);
        Task<IEnumerable<OrderCountDto>> GetRepresentativeCountOrders(string roleId,string representativeId);
    }
}
