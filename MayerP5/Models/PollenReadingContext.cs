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
