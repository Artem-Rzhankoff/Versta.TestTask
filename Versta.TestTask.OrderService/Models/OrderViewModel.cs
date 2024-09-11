using AutoMapper;

namespace Versta.TestTask.OrderService.Models;

[AutoMap(typeof(Order))]
public class OrderViewModel
{
    public long Id { get; set; }
    
    public string SenderCity { get; set; }

    public string SenderAdress { get; set; }
    
    public string ReceiverCity { get; set; }
    
    public string ReceiverAdress { get; set; }
    
    public long WeightCargo { get; set; }
    
    public DateTime DateOfCargoPickup { get; set; }
}