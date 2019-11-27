/*
 * Programmer:  Kyle Mayer
 * Email:       kmayer1@cnm.edu
 * Date:        11/22/2019
 * Program:     P5 Open Data API and SPA 
 * File:        PollenReadingContext.cs
*/

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MayerP5.Models
{
    public class PollenReadingContext : DbContext
    {
        public PollenReadingContext(DbContextOptions<PollenReadingContext> options) : base(options)
        {

        }

        public DbSet<PollenReading> PollenReadings { get; set; }
    }
}
