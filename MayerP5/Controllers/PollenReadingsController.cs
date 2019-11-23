using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MayerP5.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MayerP5.Controllers
{
    [Route("api/pollenreadings")]
    [ApiController]
    public class PollenReadingsController : Controller
    {
        private readonly PollenReadingContext _context;

        public PollenReadingsController(PollenReadingContext context)
        {
            _context = context;

            if (_context.PollenReadings.Count() == 0)
            {
                // Create a new PollenReading if collection is empty,
                // which means you can't delete all PollenReadings.
                _context.PollenReadings.Add(new PollenReading());
                _context.SaveChanges();
            }
        }

        // GET: api/pollenreadings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PollenReading>>> GetPollenReadings()
        {
            return await _context.PollenReadings.ToListAsync();
        }

        // GET: api/pollenreadings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PollenReading>> GetPollenReading(int id)
        {
            var pollenReading = await _context.PollenReadings.FindAsync(id);

            if (pollenReading == null)
            {
                return NotFound();
            }

            return pollenReading;
        }

    }
}
