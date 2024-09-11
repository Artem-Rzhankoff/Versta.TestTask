using Versta.TestTask.OrderService.Services.Interfaces;

namespace Versta.TestTask.OrderService.Services;

public class AddressService : IAddressService
{
    private readonly HttpClient _httpClient;
    private const string ApiToken = "c5b19b0d56f15676604a8f11311de069dfc0e7c1";
    private const string AddressSuggestionUrl = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";

    public AddressService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }
    
    // Предполагается, что токен впоследствии будет храниться в БД, поэтому метод асинхронный с cancellationToken
    public async Task<string> GetApiTokenAsync(CancellationToken _)
    {
        return await Task.FromResult(ApiToken);
    }

    public async Task<string> GetAddressSuggestionUrl(CancellationToken _)
    {
        return await Task.FromResult(AddressSuggestionUrl);
    }
}