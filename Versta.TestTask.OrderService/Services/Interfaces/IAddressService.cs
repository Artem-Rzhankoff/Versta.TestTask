namespace Versta.TestTask.OrderService.Services.Interfaces;

public interface IAddressService
{
    Task<string> GetApiTokenAsync(CancellationToken token);
    Task<string> GetAddressSuggestionUrl(CancellationToken token);
}