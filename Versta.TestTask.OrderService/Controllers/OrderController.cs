using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Versta.TestTask.OrderService.Infrastructure.Extensions;
using Versta.TestTask.OrderService.Models;
using Versta.TestTask.OrderService.Services.Interfaces;

namespace Versta.TestTask.OrderService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase // Controller ??
{
    private readonly IOrderService _orderService;
    private readonly IMapper _mapper;

    public OrderController(IOrderService orderService, IMapper mapper)
    {
        _orderService = orderService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<OrderViewModel[]> GetAll(CancellationToken token)
    {
        var orders = await _orderService.GetAllAsync(token);

        return orders.Select(o => o.ToOrderPreview()).ToArray();
    }

    [HttpPost("create")]
    public async Task<IActionResult> AddOrder([FromBody] OrderViewModel orderViewModel, CancellationToken token)
    {
        var id = await _orderService.AddAsync(orderViewModel, token);

        return Ok(id);
    }
}