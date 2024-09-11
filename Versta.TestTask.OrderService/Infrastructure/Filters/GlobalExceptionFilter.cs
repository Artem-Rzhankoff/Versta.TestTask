using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Versta.TestTask.OrderService.Infrastructure.Filters;

public class GlobalExceptionFilter : ExceptionFilterAttribute
{
    public override void OnException(ExceptionContext context)
    {
        var response = new
        {
            exceptionType = context.Exception.GetType().FullName,
            exceptionTrace = context.Exception.StackTrace
        };

        var jsonResult = new JsonResult(response)
        {
            StatusCode = StatusCodes.Status500InternalServerError
        };

        context.Result = jsonResult;
    }
}