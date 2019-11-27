/*
 * Programmer:  Kyle Mayer
 * Email:       kmayer1@cnm.edu
 * Date:        11/22/2019
 * Program:     P5 Open Data API and SPA 
 * File:        PollenReading.cs
*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MayerP5.Models
{
    public class PollenReading
    {
        public int Id { get; set; }
        public string Location { get; set; }
        public string PollenName { get; set; }
        public int ReadingValue { get; set; }
        public DateTime Date { get; set; }

        public PollenReading() : this("TBD", "TBD", 0, new DateTime(2019, 1, 1))
        {

        }

        public PollenReading(string location, string pollenName, int readingValue, DateTime date)
        {
            Location = location;
            PollenName = pollenName;
            ReadingValue = readingValue;
            Date = date;
        }

        public override string ToString()
        {
            return $"Reading: {ReadingValue} at location {Location} on {Date.ToString()}";
        }

    }
}
