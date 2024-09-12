using Versta.TestTask.OrderService.Models;
using Versta.TestTask.OrderService.Services.Interfaces;

namespace Versta.TestTask.OrderService.Services;

public class AddressService : IAddressService
{
    private readonly HttpClient _httpClient;
    private const string ApiToken = "c5b19b0d56f15676604a8f11311de069dfc0e7c1";

    public AddressService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }
    
    // Предполагается, что токен впоследствии будет храниться в БД, поэтому метод асинхронный с cancellationToken
    public async Task<DadataParams> GetParamsAsync(CancellationToken _)
    {
        return await Task.FromResult(new DadataParams { ApiToken = ApiToken});
    }
}