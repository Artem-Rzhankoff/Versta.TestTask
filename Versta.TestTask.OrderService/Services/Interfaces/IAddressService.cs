using Versta.TestTask.OrderService.Models;

namespace Versta.TestTask.OrderService.Services.Interfaces;

public interface IAddressService
{
    Task<DadataParams> GetParamsAsync(CancellationToken _);
}