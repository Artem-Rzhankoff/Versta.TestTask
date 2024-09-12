using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Versta.TestTask.OrderService.Models;
using Versta.TestTask.OrderService.Services.Interfaces;

namespace Versta.TestTask.OrderService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
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

        return orders.Select(o => _mapper.Map<OrderViewModel>(o)).ToArray();
    }

    [HttpGet("{courseId}")]
    public async Task<ActionResult<OrderViewModel>> Get(long courseId, CancellationToken token)
    {
        var order = await _orderService.GetAsync(courseId, token);
        var orderView = _mapper.Map<OrderViewModel>(order);

        return Ok(orderView);
    }

    [HttpPost("create")]
    public async Task<IActionResult> AddOrder([FromBody] OrderViewModel orderViewModel, CancellationToken token)
    {
        var id = await _orderService.AddAsync(orderViewModel, token);

        return Ok(id);
    }
}