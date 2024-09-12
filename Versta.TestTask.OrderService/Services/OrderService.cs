using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Versta.TestTask.OrderService.Models;
using Versta.TestTask.OrderService.Repositories.Interfaces;
using Versta.TestTask.OrderService.Services.Interfaces;

namespace Versta.TestTask.OrderService.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IMapper _mapper;

    public OrderService(IOrderRepository orderRepository, IMapper mapper)
    {
        _orderRepository = orderRepository;
        _mapper = mapper;
    }

    public async Task<Order[]> GetAllAsync(CancellationToken token)
    {
        var orders = await _orderRepository.GetAll().ToArrayAsync(token);

        return orders;
    }

    public async Task<Order> GetAsync(long id, CancellationToken token)
    {
        var order = await _orderRepository.GetAsync(id, token);

        return order;
    }

    public async Task<long> AddAsync(OrderViewModel orderViewModel, CancellationToken token)
    {
        var order = _mapper.Map<Order>(orderViewModel);
        // логика добавления менеджера

        var id = await _orderRepository.AddAsync(order, token);

        return id;
    }
}