using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Versta.TestTask.OrderService.Models;
using Versta.TestTask.OrderService.Repositories;
using Versta.TestTask.OrderService.Repositories.Interfaces;
using Versta.TestTask.OrderService.Services;
using Versta.TestTask.OrderService.Services.Interfaces;

namespace Versta.TestTask.OrderService;

public class Startup
{
    public Startup(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
    {
        Configuration = configuration;
        WebHostEnvironment = webHostEnvironment;
    }

    public IConfiguration Configuration { get; }
    public IWebHostEnvironment WebHostEnvironment { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        var connectionString = Configuration.GetConnectionString("DefaultConnection");

        services.AddDbContext<OrderContext>(options =>
        {
            options.UseNpgsql(connectionString);
        });
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies())
            .AddCors()
            .AddMvc();
        
        services.AddControllers();

        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "Versta.TestTask.OrderService", Version = "v1" });
        });

        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<IOrderService, Services.OrderService>();
        services.AddScoped<IAddressService, AddressService>();

        services.AddHttpClient();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseCors(x => x
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin());
            //.SetIsOriginAllowed(origin => true)
            //.AllowCredentials());
        app.UseRouting();
            
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
    
}