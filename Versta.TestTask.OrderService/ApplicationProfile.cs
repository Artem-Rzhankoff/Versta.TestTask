using AutoMapper;
using Versta.TestTask.OrderService.Models;

namespace Versta.TestTask.OrderService;

public class ApplicationProfile : Profile
{
    public ApplicationProfile()
    {
        CreateMap<Order, OrderViewModel>().ReverseMap();
    }
}