/*
 * Programmer:  Kyle Mayer
 * Email:       kmayer1@cnm.edu
 * Date:        11/22/2019
 * Program:     P5 Open Data API and SPA 
 * File:        Program.cs
*/

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MayerP5.Models;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace MayerP5
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<PollenReadingContext>();
                context.Database.Migrate();

                // requires using Microsoft.Extensions.Configuration;
                var config = host.Services.GetRequiredService<IConfiguration>();
            }

            host.Run();
        }


        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
