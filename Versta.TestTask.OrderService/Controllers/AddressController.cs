using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Versta.TestTask.OrderService.Models;
using Versta.TestTask.OrderService.Services.Interfaces;

namespace Versta.TestTask.OrderService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AddressController : ControllerBase
{
    private readonly IAddressService _addressService;

    public AddressController(IAddressService addressService)
    {
        _addressService = addressService;
    }

    [HttpGet("getDaDataParams")]
    public async Task<ActionResult<DadataParams>> GetDataParams(CancellationToken token)
    {
        var dadataParams = await _addressService.GetParamsAsync(token);

        return Ok(dadataParams);
    }
    
}