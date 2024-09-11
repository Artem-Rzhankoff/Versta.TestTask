using Versta.TestTask.OrderService.Models;

namespace Versta.TestTask.OrderService.Infrastructure.Extensions;

public static class MappingExtensions
{
    public static OrderViewModel ToOrderPreview(this Order order)
        => new OrderViewModel
        {
            Id = order.Id,
            SenderCity = order.SenderCity,
            SenderAdress = order.SenderAdress,
            ReceiverCity = order.ReceiverCity,
            ReceiverAdress = order.ReceiverAdress,
            WeightCargo = order.WeightCargo,
            DateOfCargoPickup = order.DateOfCargoPickup
        };
}