using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace Versta.TestTask.Common;

public class CrudRepository<TEntity> : ReadOnlyRepository<TEntity>, ICrudRepository<TEntity>
    where TEntity : class, IEntity, new()
{
    public CrudRepository(DbContext context)
        : base(context)
    {
    }
    
    public async Task<long> AddAsync(TEntity item, CancellationToken token)
    {
        await Context.AddAsync(item, token).ConfigureAwait(false);
        await Context.SaveChangesAsync(token).ConfigureAwait(false);

        return item.Id;
    }

    public async Task DeleteAsync(long id, CancellationToken token)
    {
        await Context.Set<TEntity>()
            .Where(entity => entity.Id == id)
            .ExecuteDeleteAsync(token)
            .ConfigureAwait(false);
    }

    public async Task UpdateAsync(long id, 
        Expression<Func<SetPropertyCalls<TEntity>, SetPropertyCalls<TEntity>>>setPropertyCalls, 
        CancellationToken token)
    {
        await Context.Set<TEntity>()
            .Where(entity => entity.Id == id)
            .ExecuteUpdateAsync(setPropertyCalls, token)
            .ConfigureAwait(false);
    }
}