using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Helpers
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class DisableFormValueModelBindingAttribute : Attribute, IAsyncResourceFilter
    {
        //IResourceFilter
        //public void OnResourceExecuting(ResourceExecutingContext context)
        //{
        //    var factories = context.ValueProviderFactories;
        //    factories.RemoveType<FormValueProviderFactory>();
        //    factories.RemoveType<FormFileValueProviderFactory>();
        //    factories.RemoveType<JQueryFormValueProviderFactory>();
        //}

        //public void OnResourceExecuted(ResourceExecutedContext context)
        //{
        //}

        public async Task OnResourceExecutionAsync(ResourceExecutingContext context, ResourceExecutionDelegate next)
        {
            var factories = context.ValueProviderFactories;
            factories.RemoveType<FormValueProviderFactory>();
            factories.RemoveType<FormFileValueProviderFactory>();
            factories.RemoveType<JQueryFormValueProviderFactory>();
            ResourceExecutedContext executedContext = await next();
        }
    }
}
