using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Versta.TestTask.Common;

public class ReadOnlyRepository<TEntity> : IReadOnlyRepository<TEntity>
    where TEntity : class, IEntity, new()
{
    protected readonly DbContext Context;

    public ReadOnlyRepository(DbContext context)
    {
        Context = context;
    }

    public IQueryable<TEntity> GetAll()
    {
        return Context.Set<TEntity>().AsNoTracking();
    }

    public IQueryable<TEntity> FindAll(Expression<Func<TEntity, bool>> predicate)
    {
        return Context.Set<TEntity>().AsNoTracking().Where(predicate);
    }

    public async Task<TEntity> GetAsync(long id, CancellationToken token)
    {
        return await Context.FindAsync<TEntity>(id, token).ConfigureAwait(false);
    }

    public async Task<TEntity> FindAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken token)
    {
        return await Context.Set<TEntity>().AsNoTracking().FirstOrDefaultAsync(predicate, token).ConfigureAwait(false);
    }
}