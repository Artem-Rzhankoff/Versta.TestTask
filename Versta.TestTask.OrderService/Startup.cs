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

        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "Versta.TestTask.OrderService", Version = "v1" });
        });

        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<IOrderService, Services.OrderService>();
        services.AddScoped<IAddressService, AddressService>();

        services.AddHttpClient();

        services.AddControllers();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {

        // if (env.IsDevelopment())
        // {
        //     app.UseDeveloperExceptionPage()
        //         .UseSwagger()
        //         .UseSwaggerUI();
        // }
        // else
        // {
        //     app.UseHsts();
        // }
        
        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseRouting();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
    
}