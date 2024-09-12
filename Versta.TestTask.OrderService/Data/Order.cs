using Versta.TestTask.Common;

namespace Versta.TestTask.OrderService.Models;

public class Order : IEntity
{
    public long Id { get; set; }
    
    public string SenderCity { get; set; }

    public string SenderAddress { get; set; }
    
    public string ReceiverCity { get; set; }
    
    public string ReceiverAddress { get; set; }
    
    public double WeightCargo { get; set; }
    
    public DateTime DateOfCargoPickup { get; set; }
}