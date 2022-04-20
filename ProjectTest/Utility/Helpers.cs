using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using ProjectTest.Data;
using ProjectTest.DTOs;
using ProjectTest.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectTest.Utility
{
    public static class Helpers
    {
        public static async Task<string> GetFormatPromoId(DataContext _context)
        {
            var formatId = string.Empty;
            var checkData = await _context.TrPromotion.CountAsync();

            if (checkData > 0)
            {
                var getLastId = await _context.TrPromotion.OrderByDescending(x => x.Created).Select(x => x.PromoId).FirstOrDefaultAsync();

                var lastPromoId = Convert.ToInt32(getLastId.Substring(getLastId.Length - 4));

                formatId = "P" + DateTime.Now.ToString("yyyyMMdd") + (lastPromoId + 1).ToString("0000");
            }
            else
            {
                formatId = "P" + DateTime.Now.ToString("yyyyMMdd") + "0001";
            }

            return formatId;
        }

        public static async Task SaveTxtFileStores(string fileName, List<TrStores> dataList, IWebHostEnvironment _env)
        {
            var filePath = Path.Combine(_env.WebRootPath, "Resources", "PromotionFile", (fileName + ".txt"));
            // Create a file to write to.
            using (StreamWriter sw = System.IO.File.CreateText(filePath))
            {
                foreach (var item in dataList)
                {
                    await sw.WriteLineAsync($"{item.Store}" + " " + $"{item.StoreName}" + " " + $"{item.PromoId}");
                }

                sw.Flush();
                sw.Close();
            }
        }

        public static async Task SaveTxtFilePromotion(string fileName, TrPromotion data, IWebHostEnvironment _env)
        {
            var filePath = Path.Combine(_env.WebRootPath, "Resources", "PromotionFile", (fileName + ".txt"));
            // Create a file to write to.
            using (StreamWriter sw = System.IO.File.CreateText(filePath))
            {
                await sw.WriteLineAsync($"{data.PromoId}" + " " + $"{data.PromoType}" + " " + $"{data.ValueType}" + " " + $"{data.PromoStart.ToString("dd-MM-yyyy")}" + " " + $"{data.PromoEnd.ToString("dd-MM-yyyy")}" + " " + $"{data.PromoDescription}");
                sw.Flush();
                sw.Close();
            }
        }
    }
}
