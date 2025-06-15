package BACK.dtos.response;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.Data;

/**
 * The Class PaginatedResponse.
 *
 * @param <T> the generic type
 */
@Data
public class PaginatedResponse<T> {
    
    /** The items. */
    private List<T> items;
    
    /** The current page. */
    private int currentPage;
    
    /** The total pages. */
    private int totalPages;
    
    /** The total items. */
    private long totalItems;

    /**
     * Instantiates a new paginated response.
     *
     * @param items the items
     * @param currentPage the current page
     * @param totalPages the total pages
     * @param totalItems the total items
     */
    public PaginatedResponse(List<T> items, int currentPage, int totalPages, long totalItems) {
        this.items = items;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalItems = totalItems;
    }

    /**
     * Builds the paginated response.
     *
     * @param <T> the generic type
     * @param page the page
     * @return the paginated response
     */
    public static <T> PaginatedResponse<T> buildPaginatedResponse(Page<T> page) {
        return new PaginatedResponse<>(
                page.getContent(),
                page.getNumber(),
                page.getTotalPages(),
                page.getTotalElements()
        );
    }
}
