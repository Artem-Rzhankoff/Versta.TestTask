using Microsoft.EntityFrameworkCore;
using Versta.TestTask.Common;
using Versta.TestTask.OrderService.Models;
using Versta.TestTask.OrderService.Repositories.Interfaces;

namespace Versta.TestTask.OrderService.Repositories;

public class OrderRepository : CrudRepository<Order>, IOrderRepository
{
    public OrderRepository(OrderContext context) : base(context)
    {
        
    }
}