using Versta.TestTask.OrderService.Models;

namespace Versta.TestTask.OrderService.Services.Interfaces;

public interface IOrderService
{ 
    Task<Order[]> GetAllAsync(CancellationToken token);

    Task<long> AddAsync(OrderViewModel orderViewModel, CancellationToken token);
}