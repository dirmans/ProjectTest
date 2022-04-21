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

        public static async Task<Tuple<string, string>> SaveTxtFileStores(string fileName, List<TrStores> dataList)
        {
            var filePath = Path.Combine("Resources", "PromotionFile", (fileName + ".txt"));
            var saveTo = Path.Combine(Directory.GetCurrentDirectory(), "Resources", "PromotionFile", (fileName + ".txt"));
            // Create a file to write to.
            using (StreamWriter sw = System.IO.File.CreateText(saveTo))
            {
                foreach (var item in dataList)
                {
                    await sw.WriteLineAsync($"{item.Store}" + " " + $"{item.StoreName}" + " " + $"{item.PromoId}");
                }

                sw.Flush();
                sw.Close();
            }

            return Tuple.Create(fileName, filePath);
        }

        public static async Task<Tuple<string, string>> SaveTxtFilePromotion(string fileName, TrPromotion data)
        {
            var filePath = Path.Combine("Resources", "PromotionFile", (fileName + ".txt"));
            var saveTo = Path.Combine(Directory.GetCurrentDirectory(), filePath);
            // Create a file to write to.
            using (StreamWriter sw = System.IO.File.CreateText(saveTo))
            {
                await sw.WriteLineAsync($"{data.PromoId}" + " " + $"{data.PromoType}" + " " + $"{data.ValueType}" + " " + $"{data.PromoStart.ToString("dd-MM-yyyy")}" + " " + $"{data.PromoEnd.ToString("dd-MM-yyyy")}" + " " + $"{data.PromoDescription}");
                sw.Flush();
                sw.Close();
            }

            return Tuple.Create(fileName, filePath);
        }
    }
}
