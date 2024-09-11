using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
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

    [HttpGet("getApiToken")]
    public async Task<ActionResult<string>> GetApiToken(CancellationToken token)
    {
        var apiToken = await _addressService.GetApiTokenAsync(token);

        return Ok(apiToken);
    }

    [HttpGet("addressSuggestionUrl")]
    public async Task<ActionResult<string>> GetAddressSuggestionUrl(CancellationToken token)
    {
        var url = await _addressService.GetAddressSuggestionUrl(token);

        return Ok(url);
    }
}